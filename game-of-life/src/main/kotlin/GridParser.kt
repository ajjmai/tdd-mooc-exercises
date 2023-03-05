import kotlin.system.exitProcess

const val DEAD = "b"
val gridSizeRegex = "x = (\\d+), y = (\\d+)".toRegex()
val patternRegex = "(\\d*[a-zA-Z]?)".toRegex()
val patternWithCountRegex = "(\\d+)([a-zA-Z])".toRegex()

fun parseGrid(gridSizeString: String, patternString: String): List<List<Int>> {
    if (!gridSizeString.matches(gridSizeRegex)) {
        println("Faulty grid size definition in pattern file! Program terminated.")
        exitProcess(1)
    }
    val (width, height) = gridSizeRegex.find(gridSizeString)!!.destructured
    val grid = MutableList(height.toInt()) {MutableList(width.toInt()) {0} }

    val patterns = patternString.dropLastWhile { it == '!' }.split('$')
    var row = 0
    patterns.forEach { pattern ->
        val matches = patternRegex.findAll(pattern).map { it.groupValues[1] }.toList().filter { it.isNotEmpty() }

        if (matches.size == 1 && matches.first().toIntOrNull() != null) {
            row += matches.first().toInt()
        } else {
            var col = 0
            for (m in matches) {
                if (m.matches(patternWithCountRegex)) {
                    val (count, state) = patternWithCountRegex.find(m)!!.destructured
                    if (state.lowercase() != DEAD) {
                        for (i in 0 until count.toInt()) {
                            grid[row][col + i] = 1
                        }
                    }
                    col += count.toInt()
                } else if (m.toIntOrNull() != null) {
                    row += m.toInt() - 1
                } else {
                    if (m.lowercase() != DEAD) grid[row][col] = 1
                    col++
                }
            }
            row++
        }
    }
    return grid
}

fun parseRLE(initialGrid: List<List<Int>>): String {
    var grid = initialGrid.dropWhile { it.all { x -> x == 0 } }.dropLastWhile { it.all { x -> x == 0 } }

    var dropFromLeft = 0
    for (col in grid.first().indices) {
        if (grid.all { it[col] == 0 }) dropFromLeft++
        else break
    }
    var dropFromRight = 0
    for (col in grid.first().lastIndex downTo 0) {
        if (grid.all { it[col] == 0 }) dropFromRight++
        else break
    }

    grid = grid.map { it.drop(dropFromLeft).dropLast(dropFromRight) }

    val x = grid.first().size
    val y = grid.size

    var gridPattern = ""

    for ((idx, row) in grid.withIndex()) {
        var col = 0
        while (col < row.size) {
            val state = row[col]
            var count = 0
            while (col < row.size && row[col] == state) {
                count++
                col++
            }
            if (count > 1) gridPattern += "$count"
            gridPattern += if (state == 1) "o" else "b"
        }

        gridPattern += if (idx == grid.lastIndex) "!" else "$"
    }

    val chunkedPattern = gridPattern.chunked(70).joinToString("\n")
    return "x = $x, y = $y\n$chunkedPattern"
}