class GameOfLife {
    fun createGrid(fileName: String, folder: String): Grid {
        val (gridSize, pattern) = readRLEFile(folder, fileName)
        return Grid(parseGrid(gridSize, pattern))
    }

    fun runGame(iterations: Int, grid: Grid): String {
        for (i in 0 until iterations) {
            grid.tick()
        }
        return parseRLE(grid.getGrid())
    }
}

fun main() {
    println("Give pattern file name:")
    var fileName = readln()
    while (!fileName.endsWith(".rle")) {
        println("Incorrect filename, file should be in RLE format (.rle).")
        println("Give pattern file name:")
        fileName = readln()
    }

    println("How many iterations:")
    var iterations = readln()

    while (iterations.toIntOrNull() == null || iterations.toInt() <= 0) {
        println("Iterations must be a number greater than 0.")
        println("How many iterations:")
        iterations = readln()
    }

    val game = GameOfLife()
    val resultInRLE = game.runGame(iterations.toInt(), game.createGrid(fileName, "src/main/resources/data"))
    writeRLEFile(resultInRLE, iterations, "src/main/resources/output", fileName )
}
