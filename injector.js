
// Declare the injection.
let injection = ``

fetch("links.csv")
	.then(response => response.text())
	.then(data => {

		// Split into lines and remove first line (column labels from spreadsheet)
		let lines = data.split("\n")
		lines.shift()

		// Make the single-word lines only the word (headers)
		for (let i = 0; i < lines.length; i++) {
			lines[i] = lines[i].replaceAll(",,", "")
			console.log(lines[i]);
		}

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
				<td><a href="${col[2]}">${col[1]}</a></td>
					<td><code>${col[0]}</code></td>
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
