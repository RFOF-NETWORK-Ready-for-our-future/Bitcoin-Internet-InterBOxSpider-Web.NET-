// system_status_endpoint.rs
// Provides a slightly more detailed, but still non-sensitive, public endpoint
// compared to the general api_gateway_public_status. This might include
// network metrics that are safe for public consumption.

use actix_web::{get, web, App, HttpServer, Responder};
use serde::{Serialize, Deserialize};
use std::collections::HashMap;

#[derive(Serialize, Deserialize, Debug)]
pub struct DetailedNetworkMetrics {
    pub current_nodes_online: u32,
    pub average_latency_ms: u32,
    pub data_throughput_gbps: f32,
    pub active_connections: u32,
    pub interboxspider_net_health: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct SystemDetailStatus {
    pub metrics: DetailedNetworkMetrics,
    pub service_uptime: HashMap<String, String>, // E.g., "MailGrid": "99.99%"
    pub praiai_optimization_level: String,
    pub public_advisories: Vec<String>,
    pub timestamp_utc: String,
}

#[get("/status/details")]
async fn get_system_detail_status() -> impl Responder {
    // This data would be pulled from a cached, sanitized feed from the private repo's monitoring.
    // PRAIAI ensures only non-sensitive, aggregated data is exposed here.
    let detail_status = SystemDetailStatus {
        metrics: DetailedNetworkMetrics {
            current_nodes_online: 42000, // Example large number of nodes
            average_latency_ms: 10,
            data_throughput_gbps: 87.5,
            active_connections: 1_200_000,
            interboxspider_net_health: "Perfect Flux".to_string(),
        },
        service_uptime: {
            let mut map = HashMap::new();
            map.insert("MailGrid".to_string(), "99.99%".to_string());
            map.insert("ShadowOfMetropolis".to_string(), "99.98%".to_string());
            map
        },
        praiai_optimization_level: "Quantum Nexus Tier 1".to_string(),
        public_advisories: vec![
            "No active advisories.".to_string(),
            "Next planned upgrade: Q4 2025.".to_string(),
        ],
        timestamp_utc: chrono::Utc::now().to_rfc3339(),
    };

    web::Json(detail_status)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new().service(get_system_detail_status)
    })
    .bind(("0.0.0.0", 8081))? // Using a different port for this specific endpoint
    .run()
    .await
}
