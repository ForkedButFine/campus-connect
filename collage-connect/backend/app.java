// App.java
// Requires: Maven with dependencies spark-core, mysql-connector-java, bcrypt
// Simple demo; not production hardened.

import static spark.Spark.*;
import com.google.gson.*;
import java.sql.*;
import org.mindrot.jbcrypt.BCrypt;
import java.util.*;

public class App {
    static Gson gson = new Gson();

    public static void main(String[] args) throws Exception {
        port(4567);
        staticFiles.externalLocation("frontend"); // serve frontend files

        // DB config - set your DB user/pass
        String jdbcUrl = "jdbc:mysql://localhost:3306/collage_connect?useSSL=false";
        String dbUser = "root";
        String dbPass = "7254";

        // simple helper to get connection
        java.util.function.Supplier<Connection> connSupplier = () -> {
            try { return DriverManager.getConnection(jdbcUrl, dbUser, dbPass); }
            catch (SQLException e) { throw new RuntimeException(e); }
        };

        // signup
        post("/api/signup", (req, res) -> {
            res.type("application/json");
            Map data = gson.fromJson(req.body(), Map.class);
            String name = (String)data.get("name");
            String email = (String)data.get("email");
            String password = (String)data.get("password");
            if(name==null||email==null||password==null){ res.status(400); return gson.toJson(Map.of("error","Missing fields")); }
            String pwHash = BCrypt.hashpw(password, BCrypt.gensalt(10));
            try (Connection c = connSupplier.get()){
                PreparedStatement ps = c.prepareStatement("INSERT INTO users (name,email,password_hash) VALUES(?,?,?)");
                ps.setString(1,name); ps.setString(2,email); ps.setString(3,pwHash);
                ps.executeUpdate();
                return gson.toJson(Map.of("ok",true));
            } catch (SQLException e){
                res.status(400);
                return gson.toJson(Map.of("error", e.getMessage()));
            }
        });

        // login (returns simple token: user:id - for demo only)
        post("/api/login", (req, res) -> {
            res.type("application/json");
            Map data = gson.fromJson(req.body(), Map.class);
            String email = (String)data.get("email");
            String password = (String)data.get("password");
            try (Connection c = connSupplier.get()){
                PreparedStatement ps = c.prepareStatement("SELECT id,password_hash,name FROM users WHERE email=?");
                ps.setString(1,email);
                ResultSet rs = ps.executeQuery();
                if(!rs.next()){ res.status(401); return gson.toJson(Map.of("error","Invalid")); }
                String hash = rs.getString("password_hash");
                if(!BCrypt.checkpw(password, hash)){ res.status(401); return gson.toJson(Map.of("error","Invalid")); }
                int id = rs.getInt("id");
                String token = "user:" + id; // demo token
                return gson.toJson(Map.of("token", token, "name", rs.getString("name")));
            }
        });

        // list/search colleges
        get("/api/colleges", (req,res) -> {
            res.type("application/json");
            String q = req.queryParams("q");
            String sql = "SELECT id,name,city,state,description,rating_avg FROM colleges";
            if(q != null && !q.isEmpty()) sql += " WHERE name LIKE ? OR city LIKE ? OR description LIKE ?";
            try (Connection c = connSupplier.get()){
                PreparedStatement ps = c.prepareStatement(sql);
                if(q != null && !q.isEmpty()){
                    String like = "%" + q + "%";
                    ps.setString(1,like); ps.setString(2,like); ps.setString(3,like);
                }
                ResultSet rs = ps.executeQuery();
                List<Map<String,Object>> out = new ArrayList<>();
                while(rs.next()){
                    Map<String,Object> m = new HashMap<>();
                    m.put("id", rs.getInt("id"));
                    m.put("name", rs.getString("name"));
                    m.put("city", rs.getString("city"));
                    m.put("state", rs.getString("state"));
                    m.put("description", rs.getString("description"));
                    m.put("rating_avg", rs.getObject("rating_avg"));
                    out.add(m);
                }
                return gson.toJson(out);
            }
        });

        // get college by id
        get("/api/colleges/:id", (req,res) -> {
            res.type("application/json");
            int id = Integer.parseInt(req.params("id"));
            try (Connection c = connSupplier.get()){
                PreparedStatement ps = c.prepareStatement("SELECT * FROM colleges WHERE id=?");
                ps.setInt(1,id);
                ResultSet rs = ps.executeQuery();
                if(!rs.next()){ res.status(404); return gson.toJson(Map.of("error","Not found")); }
                Map m = new HashMap<>();
                m.put("id", rs.getInt("id"));
                m.put("name", rs.getString("name"));
                m.put("city", rs.getString("city"));
                m.put("state", rs.getString("state"));
                m.put("description", rs.getString("description"));
                m.put("website", rs.getString("website"));
                m.put("contact_email", rs.getString("contact_email"));
                m.put("rating_avg", rs.getObject("rating_avg"));
                return gson.toJson(m);
            }
        });

        // simple add college (for admin/rep) - in real app restrict by auth
        post("/api/colleges", (req,res) -> {
            res.type("application/json");
            Map data = gson.fromJson(req.body(), Map.class);
            try (Connection c = connSupplier.get()){
                PreparedStatement ps = c.prepareStatement(
                  "INSERT INTO colleges (name,city,state,description,contact_email,website,created_by) VALUES(?,?,?,?,?,?,?)",
                  Statement.RETURN_GENERATED_KEYS
                );
                ps.setString(1,(String)data.get("name"));
                ps.setString(2,(String)data.get("city"));
                ps.setString(3,(String)data.get("state"));
                ps.setString(4,(String)data.get("description"));
                ps.setString(5,(String)data.get("contact_email"));
                ps.setString(6,(String)data.get("website"));
                ps.setObject(7, data.getOrDefault("created_by", null));
                ps.executeUpdate();
                ResultSet keys = ps.getGeneratedKeys();
                if(keys.next()) return gson.toJson(Map.of("id", keys.getInt(1)));
                return gson.toJson(Map.of("ok",true));
            } catch (SQLException e){
                res.status(400);
                return gson.toJson(Map.of("error", e.getMessage()));
            }
        });

        // simple health
        get("/api/ping", (q,r) -> "pong");
    }
}
