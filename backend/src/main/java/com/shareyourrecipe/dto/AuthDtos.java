package com.shareyourrecipe.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AuthDtos {
    @Data
    public static class SignupRequest {
        @NotBlank
        @Size(min = 3, max = 20)
        private String username;

        @Email
        @NotBlank
        private String email;

        @NotBlank
        @Size(min = 6, max = 120)
        private String password;
    }

    @Data
    public static class SigninRequest {
        @NotBlank
        private String username;

        @NotBlank
        private String password;
    }

    @Data
    public static class JwtResponse {
        private final String token;
        private final String username;
        private final String email;

        public JwtResponse(String token, String username, String email) {
            this.token = token;
            this.username = username;
            this.email = email;
        }
    }
}


