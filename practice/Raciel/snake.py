# Make a Snake game
# The snake is controlled by the arrow keys
# The snake is made up of a list of tuples


def main():
    # Set up the game
    pygame.init()
    screen = pygame.display.set_mode((640, 480))
    pygame.display.set_caption("Snake")
    clock = pygame.time.Clock()

    # Set up the colors
    BLACK = (0, 0, 0)
    WHITE = (255, 255, 255)
    RED = (255, 0, 0)
    GREEN = (0, 255, 0)
    BLUE = (0, 0, 255)

    # Set up the food
    food = (random.randint(0, 639), random.randint(0, 479))
    # Set up the snake
    snake_pos = [((640/2), (480/2))]
    snake_body = 1
    snake_dir = "RIGHT"

    # Set up the game loop
    while True:
        # Check for events
        for event in pygame.event.get():
            if event.type == QUIT:
                pygame.quit()
                sys.exit()
            elif event.type == KEYDOWN:
                if event.key == K_RIGHT:
                    snake_dir = "RIGHT"
                if event.key == K_LEFT:
                    snake_dir = "LEFT"
                if event.key == K_UP:
                    snake_dir = "UP"
                if event.key == K_DOWN:
                    snake_dir = "DOWN"

        # Set the background
        screen.fill(BLACK)

        # Move the snake
        if snake_dir == "RIGHT":
            snake_pos[0] = (snake_pos[0][0] + 20, snake_pos[0][1])
        if snake_dir == "LEFT":
            snake_pos[0] = (snake_pos[0][0] - 20, snake_pos[0][1])
        if snake_dir == "UP":
            snake_pos[0] = (snake_pos[0][0], snake_pos[0][1] - 20)
        if snake_dir == "DOWN":
            snake_pos[0] = (snake_pos[0][0], snake_pos[0][1] + 20)
    
        # Check if the snake has hit itself
        if snake_pos[0] in snake_pos[1:]:
            game_over(screen)

        # Check if the snake has hit the wall
        if snake_pos[0][0] < 0 or snake_pos[0][0] > 639:
            game_over(screen)
        if snake_pos[0][1] < 0 or snake_pos[0][1] > 479:
            game_over(screen)

        # Check if the snake has eaten the food
        if snake_pos[0] == food:
            food = (random.randint(0, 639), random.randint(0, 479))
            snake_body += 1
        else:
            snake_pos.pop()

        # Draw the snake
        for pos in snake_pos:
            pygame.draw.rect(screen, GREEN, pygame.Rect(pos[0], pos[1], 20, 20))

        # Draw the food
        pygame.draw.rect(screen, RED, pygame.Rect(food[0], food[1], 20, 20))

        # Update the screen
        pygame.display.update()

        # Set the speed
        clock.tick(5)


def game_over(screen):
    font = pygame.font.SysFont("monospace", 72)
    text = font.render("Game Over", True, WHITE)
    text_rect = text.get_rect()
    text_rect.center = (320, 240)
    screen.blit(text, text_rect)
    pygame.display.update()
    pygame.time.wait(2000)
    pygame.quit()
    sys.exit()


if __name__ == "__main__":
    main()
    
# End of snake.py
