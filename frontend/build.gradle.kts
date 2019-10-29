plugins {
  java
  id("com.moowork.node") version "1.2.0"
}

node {
  version = "12.13.0"
  npmVersion = "6.12.0"
  download = true
}

tasks.named<Jar>("jar") {
  dependsOn("npm_run_build")
  from("dist")
  into("static")
}

tasks.clean {
  delete(
    "dist/"
  )
}
