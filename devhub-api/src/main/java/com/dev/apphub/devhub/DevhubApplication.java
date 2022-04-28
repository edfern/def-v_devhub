package com.dev.apphub.devhub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;


@EnableAsync
@SpringBootApplication
public class DevhubApplication {

    public static void main(String[] args) {
        SpringApplication.run(DevhubApplication.class, args);
    }

}
