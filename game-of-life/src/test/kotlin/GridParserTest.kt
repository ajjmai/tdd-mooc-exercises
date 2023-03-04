import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import kotlin.IllegalArgumentException

class GridParserTest {

    @Test
    fun `empty grid of size 3x3`() {
        val grid = parseGrid("x = 3, y = 3", "")
        assertEquals(listOf(listOf(0,0,0), listOf(0,0,0), listOf(0,0,0)), grid)
    }

    @Test
    fun blinker() {
        val grid = parseGrid("x = 3, y = 1", "3o!")
        assertEquals(listOf(listOf(1,1,1)), grid)
    }

    @Test
    fun block() {
        val grid = parseGrid("x = 2, y = 2", "2o$2o!")
        assertEquals(listOf(listOf(1,1), listOf(1,1)), grid)
    }

    @Test
    fun glider() {
        val grid = parseGrid("x = 3, y = 3", "bob$2bo$3o!")
        assertEquals(listOf(listOf(0,1,0), listOf(0,0,1), listOf(1,1,1)), grid)
    }

    @Test
    fun herschel() {
        val grid = parseGrid("x = 3, y = 4", "o2b$3o\$obo$2bo!")
        assertEquals(listOf(listOf(1,0,0), listOf(1,1,1), listOf(1,0,1), listOf(0,0,1)), grid)
    }

    @Test
    fun `eater 1`() {
        val grid = parseGrid("x = 4, y = 4", "2o2b\$obob\$2bob\$2b2o!")
        assertEquals(listOf(listOf(1,1,0,0), listOf(1,0,1,0), listOf(0,0,1,0), listOf(0,0,1,1)), grid)
    }

    @Test
    fun `switch engine`() {
        val grid = parseGrid("x = 14, y = 8", "obo\$b2o\$bo6bo\$7bo\$7b3o\$11b2o\$11bobo\$11bo!")
        assertEquals(listOf(
            listOf(1,0,1,0,0,0,0,0,0,0,0,0,0,0),
            listOf(0,1,1,0,0,0,0,0,0,0,0,0,0,0),
            listOf(0,1,0,0,0,0,0,0,1,0,0,0,0,0),
            listOf(0,0,0,0,0,0,0,1,0,0,0,0,0,0),
            listOf(0,0,0,0,0,0,0,1,1,1,0,0,0,0),
            listOf(0,0,0,0,0,0,0,0,0,0,0,1,1,0),
            listOf(0,0,0,0,0,0,0,0,0,0,0,1,0,1),
            listOf(0,0,0,0,0,0,0,0,0,0,0,1,0,0),
            ), grid)
    }

    @Test
    fun `gospel glider gun`() {
        val grid = parseGrid("x = 36, y = 9", "24bo11b\$22bobo11b\$12b2o6b2o12b2o\$11bo3bo4b2o12b2o\$2o8bo5bo3b2o14b\$2o8bo3bob2o4bobo11b\$10bo5bo7bo11b\$11bo3bo20b\$12b2o!")
        assertEquals(listOf(
            listOf(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0),
            listOf(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0),
            listOf(0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1),
            listOf(0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1),
            listOf(1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
            listOf(1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0),
            listOf(0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0),
            listOf(0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
            listOf(0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
            ), grid)
    }

    @Test
    fun `pattern parsing can handle whitespace`() {
        val grid = parseGrid("x = 4, y = 4", "2o2b\$ obob\$\n2bob\$2b2o\n!")
        assertEquals(listOf(listOf(1,1,0,0), listOf(1,0,1,0), listOf(0,0,1,0), listOf(0,0,1,1)), grid)
    }

    @Test
    fun `pattern parsing can handle several lines of dead cells`() {
        val grid = parseGrid("x = 4, y = 4", "3bo$2\$o!")
        assertEquals(listOf(listOf(0,0,0,1), listOf(0,0,0,0), listOf(0,0,0,0), listOf(1,0,0,0)), grid)
    }

    @Test
    fun`pattern parsing can handle several lines without end character`() {
        val grid = parseGrid("x = 4, y = 4", "2bob2\$o!")
        assertEquals(listOf(listOf(0,0,1,0), listOf(0,0,0,0), listOf(0,0,0,0), listOf(1,0,0,0)), grid)
    }

    @Test
    fun`pattern parsing can handle other letters than o, b and B`() {
        val grid = parseGrid("x = 4, y = 4", "3Bx$2\$e!")
        assertEquals(listOf(listOf(0,0,0,1), listOf(0,0,0,0), listOf(0,0,0,0), listOf(1,0,0,0)), grid)
    }

    @Test
    fun `grid with blinker can be parsed to RLE format`() {
        val rle = parseRLE(listOf(listOf(1,1,1)))
        assertEquals("x = 3, y = 1\n3o!", rle)
    }

    @Test
    fun `grid with block can be parsed to RLE format`() {
        val rle = parseRLE(listOf(listOf(1,1), listOf(1,1)))
        assertEquals("x = 2, y = 2\n2o\$2o!", rle)
    }

    @Test
    fun `grid with glider can be parsed to RLE format`() {
        val rle = parseRLE(listOf(listOf(0,1,0), listOf(0,0,1), listOf(1,1,1)))
        assertEquals("x = 3, y = 3\nbob\$2bo\$3o!", rle)
    }

    @Test
    fun `grid with herschel can be parsed to RLE format`() {
        val rle = parseRLE(listOf(listOf(1,0,0), listOf(1,1,1), listOf(1,0,1), listOf(0,0,1)))
        assertEquals("x = 3, y = 4\no2b\$3o\$obo\$2bo!", rle)
    }

    @Test
    fun `grid with eater 1 can be parsed to RLE format`() {
        val rle = parseRLE(listOf(listOf(1,1,0,0), listOf(1,0,1,0), listOf(0,0,1,0), listOf(0,0,1,1)))
        assertEquals("x = 4, y = 4\n2o2b\$obob\$2bob\$2b2o!", rle)
    }

    @Test
    fun `parsing grid to RLE format removes rows and cols with all dead cells`() {
        val rle = parseRLE(listOf(listOf(0,0,0,0,0,0,0,0),listOf(0,0,0,0,0,0,0,0),listOf(0,0,0,1,0,0,0,0), listOf(0,0,0,0,1,0,0,0), listOf(0,0,1,1,1,0,0,0), listOf(0,0,0,0,0,0,0,0), listOf(0,0,0,0,0,0,0,0), listOf(0,0,0,0,0,0,0,0)))
        assertEquals("x = 3, y = 3\nbob\$2bo\$3o!", rle)
    }

    @Test
    fun `grid with sailboat can be parsed to RLE format`() {
        val grid = parseGrid("x = 29, y = 25",
            "8bo11bo8b\$7bobo9bobo7b\$8bo11bo8b2\$6b5o7b5o6b\$5bo4bo7bo4bo5b\$4bo2bo13bo" +
                "2bo4b\$bo2bob2o13b2obo2bob\$obobo5bo7b2o4bobobo\$bo2bo4bobo5bo2bo3bo2bob\$" +
                "4b2o2bo2bo6bobo2b2o4b\$9b2o8bo9b\$13b2o14b\$13bobo13b\$14bo14b\$17b3o9b\$5bo" +
                "bo2bo5bo12b\$5b3obob2o3bo3bo8b\$4bo6bo4bo2bobo7b\$5bo5b2o5bobo2bo5b\$19bo" +
                "3bo5b\$4b2o5bo11bo5b\$5bo6bo7b3o6b\$4b2obob3o17b\$6bo2bobo!")
        val rle = parseRLE(grid)

        val expected = "x = 29, y = 25\n" +
        "8bo11bo8b$7bobo9bobo7b$8bo11bo8b$29b$6b5o7b5o6b$5bo4bo7bo4bo5b$4bo2bo1\n" +
        "3bo2bo4b${'$'}bo2bob2o13b2obo2bob${'$'}obobo5bo7b2o4bobobo${'$'}bo2bo4bobo5bo2bo3bo2b\n" +
        "ob$4b2o2bo2bo6bobo2b2o4b$9b2o8bo9b$13b2o14b$13bobo13b$14bo14b$17b3o9b$\n" +
        "5bobo2bo5bo12b$5b3obob2o3bo3bo8b$4bo6bo4bo2bobo7b$5bo5b2o5bobo2bo5b$19\n" +
        "bo3bo5b$4b2o5bo11bo5b$5bo6bo7b3o6b$4b2obob3o17b$6bo2bobo17b!"

        assertEquals(expected, rle)
    }
}