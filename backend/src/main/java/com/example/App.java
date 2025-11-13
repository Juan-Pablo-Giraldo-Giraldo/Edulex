package com.example;

import static spark.Spark.*;
import com.google.gson.Gson;
import java.util.Map;
import java.util.HashMap;

public class App {
    public static void main(String[] args) {
        port(4567);
        // Servir archivos estáticos desde la carpeta frontend (ruta relativa cuando se ejecuta desde la carpeta backend)
        staticFiles.externalLocation("../frontend");

        get("/", (req, res) -> {
            res.redirect("/index.html");
            return null;
        });

        post("/login", (req, res) -> {
            res.type("application/json");
            Gson gson = new Gson();
            Map body = gson.fromJson(req.body(), Map.class);
            String username = body.getOrDefault("username", "").toString();
            String email = body.getOrDefault("email", "").toString();

            Map<String,Object> reply = new HashMap<>();
            // Lógica simple de ejemplo: acepta si hay username y el email contiene @
            if(username != null && !username.isEmpty() && email != null && email.contains("@")){
                reply.put("success", true);
                reply.put("message", "Usuario autenticado (demo): " + username);
            } else {
                reply.put("success", false);
                reply.put("message", "Usuario o correo inválido");
            }
            return gson.toJson(reply);
        });

        post("/register", (req, res) -> {
            res.type("application/json");
            Gson gson = new Gson();
            Map body = gson.fromJson(req.body(), Map.class);
            String name = body.getOrDefault("name", "").toString();
            String email = body.getOrDefault("email", "").toString();
            String password = body.getOrDefault("password", "").toString();

            Map<String,Object> reply = new HashMap<>();
            // Validación simple: datos no vacíos, email válido y contraseña mínima
            if(name != null && !name.isEmpty() && email != null && email.contains("@") && password != null && password.length() >= 6){
                // Aquí podrías guardar en BD — demo devuelve éxito
                reply.put("success", true);
                reply.put("message", "Registro exitoso: " + name);
            } else {
                reply.put("success", false);
                reply.put("message", "Datos inválidos. Asegúrate de completar todos los campos y que la contraseña tenga al menos 6 caracteres.");
            }
            return gson.toJson(reply);
        });
    }
}
