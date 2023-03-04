import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

class GridTest {
    private val gridAllDead = listOf(listOf(0,0,0), listOf(0,0,0), listOf(0,0,0))
    private val gridOneAlive = listOf(listOf(0,0,0), listOf(0,1,0), listOf(0,0,0))

    @Test
    fun `when all cells are dead`() {
        val grid = Grid(gridAllDead)
        grid.tick()
        assertEquals(gridAllDead, grid.getGrid())
    }

    @Test
    fun `when there is one living cell without neighbours`() {
        val grid = Grid(gridOneAlive)
        grid.tick()
        assertEquals(gridAllDead, grid.getGrid())
    }

    @Test
    fun `when one living cell has two neighbours`() {
        val gridThreeAlive = listOf(listOf(1,0,0), listOf(0,1,0), listOf(0,0,1))
        val grid = Grid(gridThreeAlive)
        grid.tick()
        assertEquals(listOf(listOf(0,0,0,0,0),listOf(0,0,0,0,0), listOf(0,0,1,0,0), listOf(0,0,0,0,0),listOf(0,0,0,0,0)), grid.getGrid())
    }
    @Test
    fun `when there are four living cells initially`() {
        val gridFourAlive = listOf(listOf(1,0,0), listOf(0,1,0), listOf(1,0,1))
        val grid = Grid(gridFourAlive)
        grid.tick()
        assertEquals(listOf(listOf(0,0,0,0,0),listOf(0,0,0,0,0), listOf(0,1,1,0,0), listOf(0,0,1,0,0),listOf(0,0,0,0,0)), grid.getGrid())
    }
    @Test
    fun `when there are five living cells initially`() {
        val gridFiveAlive = listOf(listOf(1,0,1), listOf(0,1,0), listOf(1,0,1))
        val grid = Grid(gridFiveAlive)
        grid.tick()
        assertEquals(listOf(listOf(0,0,0,0,0),listOf(0,0,1,0,0), listOf(0,1,0,1,0), listOf(0,0,1,0,0),listOf(0,0,0,0,0)), grid.getGrid())
    }
    @Test
    fun `when there are six living cells initially`() {
        val gridSixAlive = listOf(listOf(1,1,1), listOf(0,1,0), listOf(1,0,1))
        val grid = Grid(gridSixAlive)
        grid.tick()
        assertEquals(listOf(listOf(0,0,1,0,0),listOf(0,1,1,1,0), listOf(0,0,0,0,0), listOf(0,0,1,0,0),listOf(0,0,0,0,0)), grid.getGrid())
    }
    @Test
    fun `when there are seven living cells initially`() {
        val gridSevenAlive = listOf(listOf(1,1,1), listOf(1,1,0), listOf(1,0,1))
        val grid = Grid(gridSevenAlive)
        grid.tick()
        assertEquals(listOf(listOf(0,0,1,0,0),listOf(0,1,0,1,0), listOf(1,0,0,0,0), listOf(0,1,0,0,0),listOf(0,0,0,0,0)), grid.getGrid())
    }
    @Test
    fun `when there are eight living cells initially`() {
        val gridEightAlive = listOf(listOf(1,1,1), listOf(1,1,1), listOf(1,0,1))
        val grid = Grid(gridEightAlive)
        grid.tick()
        assertEquals(listOf(listOf(0,0,1,0,0),listOf(0,1,0,1,0), listOf(1,0,0,0,1), listOf(0,1,0,1,0),listOf(0,0,0,0,0)), grid.getGrid())
    }

    @Test
    fun `when there are nine living cells initially`() {
        val gridNineAlive = listOf(listOf(1,1,1), listOf(1,1,1), listOf(1,1,1))
        val grid = Grid(gridNineAlive)
        grid.tick()
        assertEquals(listOf(listOf(0,0,1,0,0),listOf(0,1,0,1,0), listOf(1,0,0,0,1), listOf(0,1,0,1,0),listOf(0,0,1,0,0)), grid.getGrid())
    }
}