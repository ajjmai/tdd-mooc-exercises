class Grid(initialGrid: List<List<Int>>) {

    private var grid = initialGrid

    fun getGrid() = this.grid

    private fun pad() {
        val paddedGrid = this.grid.map { it.toMutableList() }.toMutableList()
        if (paddedGrid.any { it.first() == 1 }) paddedGrid.forEach { it.add(0, 0) }
        if (paddedGrid.any { it.last() == 1 }) paddedGrid.forEach { it.add(0) }
        if (paddedGrid.first().any { it == 1 }) paddedGrid.add(0, MutableList(paddedGrid.first().size){0})
        if (paddedGrid.last().any {it == 1}) paddedGrid.add(MutableList(paddedGrid.first().size){0})
        this.grid = paddedGrid.toList()
    }
    fun tick() {
        this.pad()
        val newGrid = mutableListOf<MutableList<Int>>()
        for (row in grid.indices) {
            val newRow = mutableListOf<Int>()
            for (col in 0 until grid[row].size) {
                val cell = grid[row][col]
                val neighbourCount = getNeighbours(row, col)

                if (cell == 1 && (neighbourCount < 2 || neighbourCount > 3) ) newRow.add(0)
                else if (cell == 1 && (neighbourCount == 2 || neighbourCount == 3) ) newRow.add(1)
                else if (cell == 0 && neighbourCount == 3) newRow.add(1)
                else newRow.add(0)
            }
            newGrid.add(newRow)
        }
        grid = newGrid
    }

    private fun getNeighbours(row: Int, col: Int) =
        listOfNotNull(
            grid.getOrNull(row - 1)?.getOrNull(col),
            grid.getOrNull(row - 1)?.getOrNull(col + 1),
            grid.getOrNull(row)?.getOrNull(col + 1),
            grid.getOrNull(row + 1)?.getOrNull(col + 1),
            grid.getOrNull(row + 1)?.getOrNull(col),
            grid.getOrNull(row + 1)?.getOrNull(col - 1),
            grid.getOrNull(row)?.getOrNull(col - 1),
            grid.getOrNull(row - 1)?.getOrNull(col - 1)
        ).sum()

}