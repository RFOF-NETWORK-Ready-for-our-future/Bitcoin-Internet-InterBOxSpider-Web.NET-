// api_gateway_public_status.rs
// This file defines a simplified, read-only public API endpoint for general status queries
// of the #BitcoinInternet, designed for external consumption without exposing sensitive data.

use actix_web::{get, web, App, HttpServer, Responder};
use serde::{Serialize, Deserialize};
use std::collections::HashMap;

// --- Data Structures for Public Status ---

#[derive(Serialize, Deserialize, Debug)]
pub struct SystemStatus {
    pub overall_status: String,
    pub network_health: String,
    pub core_services_operational: HashMap<String, bool>, // E.g., "MailGrid": true, "ChatFlow": false
    pub praiai_status: String,
    pub last_updated_utc: String,
    pub public_message: Option<String>,
}

// --- Public Status Endpoint Handler ---

#[get("/status/public")]
async fn get_public_system_status() -> impl Responder {
    // In a real implementation, this would query internal, non-sensitive telemetry.
    // PRAIAI would aggregate and sanitize this data from the private RFOF-NETWORK.org repo's endpoints.
    let current_status = SystemStatus {
        overall_status: "Operational".to_string(),
        network_health: "Optimal".to_string(),
        core_services_operational: {
            let mut map = HashMap::new();
            map.insert("MailGrid".to_string(), true);
            map.insert("ChatFlow".to_string(), true);
            map.insert("SpectraStream".to_string(), true);
            // ... add more core services here
            map
        },
        praiai_status: "Active & Optimizing".to_string(),
        last_updated_utc: chrono::Utc::now().to_rfc3339(),
        public_message: Some("The #BitcoinInternet is running smoothly, expanding reality.".to_string()),
    };

    web::Json(current_status)
}

// --- Main function to start a minimal public status server (for demonstration/testing) ---
// Note: In production, this would likely be part of a larger, secured public-facing service.
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new().service(get_public_system_status)
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
