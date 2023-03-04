import java.io.File
import java.io.FileNotFoundException
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import kotlin.system.exitProcess

fun readRLEFile(folder: String, fileName: String): Pair<String, String> {
    val file = File(folder, fileName)

    if (!file.exists()) {
        println("File $fileName does not exist! Program terminated.")
        exitProcess(1)
    }

    var fileContents = File(folder, fileName).readLines().dropWhile { it.startsWith('#') }

    val gridSize = fileContents.first().split(", rule").first()
    val pattern = fileContents.drop(1).joinToString("")

    return Pair(gridSize, pattern)
 }

fun createRLEFile(pattern: String, iterations: Int? = 0, patternName: String):String {
    val timeStamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm"))

    return "#N ${patternName.replaceFirstChar { it.uppercase() }} after $iterations iterations\n" +
    "#0 Aija's Game of Life App $timeStamp\n" +
    "$pattern"
}

fun writeRLEFile(pattern: String, iterations: String, folder: String, fileName: String) {
    val patternName = fileName.removeSuffix(".rle")
    val contents = createRLEFile(pattern, iterations.toIntOrNull(), patternName)
    val timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("A"))

    val fileName = "$folder/$patternName$timestamp.rle"
    File(fileName).writeText(contents)
    println("\n=============================")
    println("Saved game result in $fileName:\n")
    println(contents)
}