import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*

class GameOfLifeTest {
    @Test
    fun `initialise grid from file`() {
        val gameOfLife = GameOfLife()
        val grid = gameOfLife.createGrid( "blinker.rle", "src/test/resources/testdata")
        assertEquals(listOf(listOf(1,1,1)), grid.getGrid())
    }

    @Test
    fun `initialise large grid from file`() {
        val gameOfLife = GameOfLife()
        val grid = gameOfLife.createGrid( "sailboat.rle", "src/test/resources/testdata")
        assertEquals(listOf(
            listOf(0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0),
            listOf(0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0),
            listOf(0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0),
            listOf(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
            listOf(0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0),
            listOf(0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0),
            listOf(0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0),
            listOf(0,1,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,1,0),
            listOf(1,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,1,0,1),
            listOf(0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,1,0,0,0,1,0,0,1,0),
            listOf(0,0,0,0,1,1,0,0,1,0,0,1,0,0,0,0,0,0,1,0,1,0,0,1,1,0,0,0,0),
            listOf(0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0),
            listOf(0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
            listOf(0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0),
            listOf(0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
            listOf(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0),
            listOf(0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0),
            listOf(0,0,0,0,0,1,1,1,0,1,0,1,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0),
            listOf(0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0,0),
            listOf(0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0),
            listOf(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0),
            listOf(0,0,0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0),
            listOf(0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0),
            listOf(0,0,0,0,1,1,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
            listOf(0,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
        ), grid.getGrid())
    }

    @Test
    fun `initialise glider from file`() {
        val gameOfLife = GameOfLife()
        val grid = gameOfLife.createGrid( "glider.rle", "src/test/resources/testdata")
        assertEquals(listOf(listOf(0,1,0),listOf(0,0,1), listOf(1,1,1)), grid.getGrid())
    }

    @Test
    fun `run glider 1 iteration`() {
        val gameOfLife = GameOfLife()
        val grid = gameOfLife.createGrid( "glider.rle", "src/test/resources/testdata")
        val rle = gameOfLife.runGame(1, grid)
        assertEquals(listOf(listOf(0,0,0,0,0),listOf(0,0,0,0,0),listOf(0,1,0,1,0), listOf(0,0,1,1,0), listOf(0,0,1,0,0)), grid.getGrid())
        assertEquals("x = 3, y = 3\nobo\$b2o\$bob!", rle)
    }

    @Test
    fun `run glider 2 iteration`() {
        val gameOfLife = GameOfLife()
        val grid = gameOfLife.createGrid( "glider.rle", "src/test/resources/testdata")
        val rle = gameOfLife.runGame(2, grid)
        assertEquals(listOf(listOf(0,0,0,0,0),listOf(0,0,0,0,0),listOf(0,0,0,1,0), listOf(0,1,0,1,0), listOf(0,0,1,1,0), listOf(0,0,0,0,0)), grid.getGrid())
        assertEquals("x = 3, y = 3\n2bo\$obo\$b2o!", rle)

    }

    @Test
    fun `run glider 3 iteration`() {
        val gameOfLife = GameOfLife()
        val grid = gameOfLife.createGrid( "glider.rle", "src/test/resources/testdata")
        val rle = gameOfLife.runGame(3, grid)
        assertEquals(listOf(listOf(0,0,0,0,0),listOf(0,0,0,0,0),listOf(0,0,1,0,0), listOf(0,0,0,1,1), listOf(0,0,1,1,0), listOf(0,0,0,0,0)), grid.getGrid())
        assertEquals("x = 3, y = 3\no2b\$b2o\$2ob!", rle)
    }

    @Test
    fun `run glider 4 iteration`() {
        val gameOfLife = GameOfLife()
        val grid = gameOfLife.createGrid( "glider.rle", "src/test/resources/testdata")
        val rle = gameOfLife.runGame(4, grid)
        assertEquals(listOf(listOf(0,0,0,0,0,0),listOf(0,0,0,0,0,0),listOf(0,0,0,1,0,0), listOf(0,0,0,0,1,0), listOf(0,0,1,1,1,0), listOf(0,0,0,0,0,0)), grid.getGrid())
        assertEquals("x = 3, y = 3\nbob\$2bo\$3o!", rle)
    }
}