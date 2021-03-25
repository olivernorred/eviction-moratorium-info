
// Declare the injection.
let injection = ``

fetch("links.csv")
	.then(response => response.text())
	.then(data => {

		// Split into lines and remove first line (column labels from spreadsheet)
		let lines = data.split("\n")
		lines.shift()

		// Make the single-word lines only the word (headers)
		lines.forEach((l, i) => {
			lines[i] = l.replace(/,\s*$/, "")
			lines[i] = lines[i].replace("www.", "")
		})

		// For each line, if there's only one item (headers like "News"),
			// 1. close the table
			// 2. put into an <h2>, and
			// 3. start a new table.
		// Else, file into a <tr> with two cells: the link and the source name
		for (let i = 0; i < lines.length; i++) {
			const l = lines[i];
			let col = l.split(",")
			let row;
			if(col.length === 1) {
				row = `</table>
				<h2 class="banner">${col[0]}</h2>
				<table>`
			}
			else {
				row = 
				`<tr>
				<td><a href="${col[1]}">${col[0]}</a></td>
					<td><code>${getHostname(col[1])}</code></td>
				</tr>`
			}

			// Append the generated HTML to the injection for every pass
			injection+=row
		}

		// Close the last table tag
		injection += "</table>"
		
		// Remove the first "</table>"
		injection = injection.slice(8)

		// Put the table into the "generated"
		document.querySelector("#linklist").innerHTML = injection
	})


// Function for extracting hostname from url
const getHostname = (url) => {
	// use URL constructor and return hostname
	return new URL(url).hostname;
}