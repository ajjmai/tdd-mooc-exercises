# TDD-MOOC Exercise 6: Conway's Game of Life

My submission for University of Helsinki [TDD course exercise 6](https://tdd.mooc.fi/exercises#exercise-6-conways-game-of-life): [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) .

Created with Kotlin and JUnit5.

# Running the program
Run `GameOfLife.kt`
This is a command line application.
The program takes file name in [RLE format](https://conwaylife.com/wiki/Run_Length_Encoded) (file should be in `src/main/kotlin/resources/data`) and number of iterations as input.
The program output the result in command line and in file in folder `src/main/kotlin/resources/output`.

# Running tests
Run tests in `src/test/kotlin/`

# About the exercise
The application is created following test driven development, i.e. creating tests first and then creating the program code that passes the tests.
I tried to add error handling where relevant but did not know how to create unit tests for those or writing a file, so those parts were tested manually.

According to the RLE specification: "Dead cells at the end of a pattern line do not need to be encoded, nor does the end of the last line of the pattern". The program can handle such input where dead cells are omitted, but the program output contains all cells. 
The program does not save the absolute coordinates for a pattern. These were not requirements of the exercise, and I chose to not to implement them due to time constraints.