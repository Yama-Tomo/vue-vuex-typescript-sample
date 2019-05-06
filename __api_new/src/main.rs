extern crate actix_web;
use actix_web::{http, server, App, Path};

fn index(info: Path<(u32, String)>) -> String {
    format!("Hello {}! id:{}", info.1, info.0)
}

fn main() {
    server::new(
        || App::new()
            .route("/{id}/{name}/index.html", http::Method::GET, index))
        .bind("0.0.0.0:8080").unwrap()
        .run();
}
