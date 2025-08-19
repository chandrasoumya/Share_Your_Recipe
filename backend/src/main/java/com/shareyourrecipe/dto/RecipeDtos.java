package com.shareyourrecipe.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RecipeDtos {
    @Data
    public static class CreateRecipeRequest {
        @NotBlank
        private String title;
        @NotBlank
        private String ingredients;
        @NotBlank
        private String method;
    }

    @Data
    public static class CommentRequest {
        @NotBlank
        private String content;
    }
}


