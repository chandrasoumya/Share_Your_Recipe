package com.shareyourrecipe.repository;

import com.shareyourrecipe.model.Recipe;
import com.shareyourrecipe.model.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findAllByAuthor(User author);

    @EntityGraph(attributePaths = {"author", "comments", "comments.author", "likedBy"})
    Optional<Recipe> findWithAllById(Long id);
}


