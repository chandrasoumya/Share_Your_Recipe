package com.shareyourrecipe.controller;

import com.shareyourrecipe.dto.RecipeDtos;
import com.shareyourrecipe.model.Comment;
import com.shareyourrecipe.model.Recipe;
import com.shareyourrecipe.service.RecipeService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin
public class RecipeController {
    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping
    public ResponseEntity<List<Recipe>> list() {
        return ResponseEntity.ok(recipeService.listAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recipe> get(@PathVariable Long id) {
        return ResponseEntity.ok(recipeService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Recipe> create(@AuthenticationPrincipal UserDetails user,
                                         @Valid @RequestBody RecipeDtos.CreateRecipeRequest request) {
        return ResponseEntity.ok(recipeService.createRecipe(user.getUsername(), request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@AuthenticationPrincipal UserDetails user, @PathVariable Long id) {
        recipeService.deleteRecipe(user.getUsername(), id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<Recipe> like(@AuthenticationPrincipal UserDetails user, @PathVariable Long id) {
        return ResponseEntity.ok(recipeService.likeRecipe(user.getUsername(), id));
    }

    @PostMapping("/{id}/unlike")
    public ResponseEntity<Recipe> unlike(@AuthenticationPrincipal UserDetails user, @PathVariable Long id) {
        return ResponseEntity.ok(recipeService.unlikeRecipe(user.getUsername(), id));
    }

    @PostMapping("/{id}/comments")
    public ResponseEntity<Comment> addComment(@AuthenticationPrincipal UserDetails user, @PathVariable Long id,
                                              @Valid @RequestBody RecipeDtos.CommentRequest request) {
        return ResponseEntity.ok(recipeService.addComment(user.getUsername(), id, request));
    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(@AuthenticationPrincipal UserDetails user, @PathVariable Long commentId) {
        recipeService.deleteComment(user.getUsername(), commentId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/favorite")
    public ResponseEntity<Recipe> addFavorite(@AuthenticationPrincipal UserDetails user, @PathVariable Long id) {
        return ResponseEntity.ok(recipeService.addFavorite(user.getUsername(), id));
    }

    @PostMapping("/{id}/unfavorite")
    public ResponseEntity<Recipe> removeFavorite(@AuthenticationPrincipal UserDetails user, @PathVariable Long id) {
        return ResponseEntity.ok(recipeService.removeFavorite(user.getUsername(), id));
    }
}


