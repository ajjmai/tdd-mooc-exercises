class GameOfLife {
    fun greeting() = "Hello World"

    companion object {
        fun start() {
            print("Hello")
        }
    }
}

fun main(args: Array<String>) {
    println("Running the main function")
    GameOfLife.start()
}
