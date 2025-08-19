package com.shareyourrecipe.service;

import com.shareyourrecipe.dto.RecipeDtos;
import com.shareyourrecipe.model.Comment;
import com.shareyourrecipe.model.Recipe;
import com.shareyourrecipe.model.User;
import com.shareyourrecipe.repository.CommentRepository;
import com.shareyourrecipe.repository.RecipeRepository;
import com.shareyourrecipe.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;

    public RecipeService(RecipeRepository recipeRepository, UserRepository userRepository, CommentRepository commentRepository) {
        this.recipeRepository = recipeRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
    }

    public Recipe createRecipe(String username, RecipeDtos.CreateRecipeRequest request) {
        User author = userRepository.findByUsername(username).orElseThrow();
        Recipe recipe = Recipe.builder()
                .title(request.getTitle())
                .ingredients(request.getIngredients())
                .method(request.getMethod())
                .author(author)
                .build();
        return recipeRepository.save(recipe);
    }

    public void deleteRecipe(String username, Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow();
        if (!recipe.getAuthor().getUsername().equals(username)) {
            throw new SecurityException("Not authorized to delete this recipe");
        }
        recipeRepository.delete(recipe);
    }

    public List<Recipe> listAll() {
        return recipeRepository.findAll();
    }

    public Recipe getById(Long id) {
        return recipeRepository.findWithAllById(id).orElseThrow();
    }

    public Recipe likeRecipe(String username, Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow();
        User user = userRepository.findByUsername(username).orElseThrow();
        recipe.getLikedBy().add(user);
        return recipeRepository.save(recipe);
    }

    public Recipe unlikeRecipe(String username, Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow();
        User user = userRepository.findByUsername(username).orElseThrow();
        recipe.getLikedBy().remove(user);
        return recipeRepository.save(recipe);
    }

    public Comment addComment(String username, Long recipeId, RecipeDtos.CommentRequest request) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow();
        User user = userRepository.findByUsername(username).orElseThrow();
        Comment comment = Comment.builder()
                .content(request.getContent())
                .recipe(recipe)
                .author(user)
                .build();
        return commentRepository.save(comment);
    }

    public void deleteComment(String username, Long commentId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow();
        if (!comment.getAuthor().getUsername().equals(username) && !comment.getRecipe().getAuthor().getUsername().equals(username)) {
            throw new SecurityException("Not authorized to delete this comment");
        }
        commentRepository.delete(comment);
    }

    public Recipe addFavorite(String username, Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow();
        User user = userRepository.findByUsername(username).orElseThrow();
        user.getFavorites().add(recipe);
        userRepository.save(user);
        return recipe;
    }

    public Recipe removeFavorite(String username, Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow();
        User user = userRepository.findByUsername(username).orElseThrow();
        user.getFavorites().remove(recipe);
        userRepository.save(user);
        return recipe;
    }
}


