import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

class RLEFileParserTest {
    private val testDataFolder = "src/test/resources/testdata"
    private val timeStamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm"))

    @Test
    fun `reads a RLE file and returns grid size and pattern`() {
        val result = readRLEFile(testDataFolder, "blinker.rle")
        assertEquals(Pair("x = 3, y = 1", "3o!"), result)
    }

    @Test
    fun `reads and parses glider`() {
        val result = readRLEFile(testDataFolder, "glider.rle")
        assertEquals(Pair("x = 3, y = 3","bob\$2bo\$3o!"), result)
    }

    @Test
    fun `reads and parses gosper glider gun`() {
        val result = readRLEFile(testDataFolder, "gosperglidergun.rle")
        assertEquals(Pair("x = 36, y = 9", "24bo11b\$22bobo11b\$12b2o6b2o12b2o\$11bo3bo4b2o12b2o\$2o8bo5bo3b2o14b\$2o8bo3bob2o4bobo11b\$10bo5bo7bo11b\$11bo3bo20b\$12b2o!"), result)
    }

    @Test
    fun `reads and parses sailboat`() {
        val result = readRLEFile(testDataFolder, "sailboat.rle")
        assertEquals(Pair("x = 29, y = 25",
            "8bo11bo8b\$7bobo9bobo7b\$8bo11bo8b2\$6b5o7b5o6b\$5bo4bo7bo4bo5b\$4bo2bo13bo" +
            "2bo4b\$bo2bob2o13b2obo2bob\$obobo5bo7b2o4bobobo\$bo2bo4bobo5bo2bo3bo2bob\$" +
            "4b2o2bo2bo6bobo2b2o4b\$9b2o8bo9b\$13b2o14b\$13bobo13b\$14bo14b\$17b3o9b\$5bo" +
            "bo2bo5bo12b\$5b3obob2o3bo3bo8b\$4bo6bo4bo2bobo7b\$5bo5b2o5bobo2bo5b\$19bo" +
            "3bo5b\$4b2o5bo11bo5b\$5bo6bo7b3o6b\$4b2obob3o17b\$6bo2bobo!"), result)
    }

    @Test
    fun `creates correct blinker file contents`() {
        val result = createRLEFile("x = 3, y = 1\n3o!", 4, "blinker")

        val expected = """
            #N Blinker after 4 iterations
            #0 Aija's Game of Life App $timeStamp
            x = 3, y = 1
            3o!
        """.trimIndent()
        assertEquals(expected, result)
    }

    @Test
    fun `creates correct glider file contents`() {
        val result = createRLEFile("x = 3, y = 3\nbob\$2bo\$3o!", 10, "glider")

        val expected = """
            #N Glider after 10 iterations
            #0 Aija's Game of Life App $timeStamp
            x = 3, y = 3
            bob$2bo$3o!
        """.trimIndent()
        assertEquals(expected, result)
    }

    @Test
    fun `creates correct sailboat file contents`() {
        val pattern = "8bo11bo8b\$7bobo9bobo7b\$8bo11bo8b2\$6b5o7b5o6b\$5bo4bo7bo4bo5b\$4bo2bo13bo" +
            "2bo4b\$bo2bob2o13b2obo2bob\$obobo5bo7b2o4bobobo\$bo2bo4bobo5bo2bo3bo2bob\$" +
            "4b2o2bo2bo6bobo2b2o4b\$9b2o8bo9b\$13b2o14b\$13bobo13b\$14bo14b\$17b3o9b\$5bo" +
            "bo2bo5bo12b\$5b3obob2o3bo3bo8b\$4bo6bo4bo2bobo7b\$5bo5b2o5bobo2bo5b\$19bo" +
            "3bo5b\$4b2o5bo11bo5b\$5bo6bo7b3o6b\$4b2obob3o17b\$6bo2bobo!"
        val result = createRLEFile("x = 29, y = 25\n${pattern.chunked(70).joinToString("\n")}",
            222, "sailboat")

        val expected = """
            #N Sailboat after 222 iterations
            #0 Aija's Game of Life App $timeStamp
            x = 29, y = 25
            8bo11bo8b$7bobo9bobo7b$8bo11bo8b2$6b5o7b5o6b$5bo4bo7bo4bo5b$4bo2bo13bo
            2bo4b${'$'}bo2bob2o13b2obo2bob${'$'}obobo5bo7b2o4bobobo${'$'}bo2bo4bobo5bo2bo3bo2bob$
            4b2o2bo2bo6bobo2b2o4b$9b2o8bo9b$13b2o14b$13bobo13b$14bo14b$17b3o9b$5bo
            bo2bo5bo12b$5b3obob2o3bo3bo8b$4bo6bo4bo2bobo7b$5bo5b2o5bobo2bo5b$19bo3
            bo5b$4b2o5bo11bo5b$5bo6bo7b3o6b$4b2obob3o17b$6bo2bobo!
        """.trimIndent()
        assertEquals(expected, result)
    }
}