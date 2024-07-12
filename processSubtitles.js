const fs = require('fs');
const mammoth = require('mammoth');
const { Document, Packer, Paragraph, TextRun } = require('docx');

/**
 * Converts subtitle text into a paragraph by concatenating text after each dot (period) or question mark.
 * @param {string} subtitles - The formatted subtitles as a string.
 * @returns {string} - The resulting paragraph.
 */
function subtitlesToParagraph(subtitles) {
    // Split the subtitle content into lines
    const lines = subtitles.split('\n');
    let paragraph = '';
    let currentSentence = '';

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip empty lines and lines with timestamps
        if (line === '' || /^\d{1,2}:\d{2}$/.test(line) || /^\d{1,2}:\d{2}(:\d{2})?$/.test(line)) {
            continue;
        }

        // Add the line to the current sentence
        currentSentence += ' ' + line;

        // If the line ends with a dot or question mark, add the current sentence to the paragraph
        if (line.endsWith('.') || line.endsWith('?')) {
            paragraph += currentSentence.trim() + ' ';
            currentSentence = '';
        }
    }

    // Add any remaining sentence (if any)
    if (currentSentence) {
        paragraph += currentSentence.trim();
    }

    // Return the final paragraph
    return paragraph.trim();
}

// Define the path to the .docx file
const filePath = "C:/Users/7J3525897/Desktop/Java/MeetingRecording.docx";

// Read the .docx file
mammoth.extractRawText({ path: filePath })
    .then(result => {
        const subtitlesContent = result.value;
        const paragraph = subtitlesToParagraph(subtitlesContent);

        // Create a new document
        const doc = new Document({
            sections: [{
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new TextRun(paragraph)
                        ]
                    })
                ],
            }]
        });

        // Save the new document
        Packer.toBuffer(doc).then(buffer => {
            fs.writeFileSync("C:/Users/7J3525897/Desktop/Java/OutputParagraph.docx", buffer);
            console.log("Document created successfully");
        });
    })
    .catch(err => {
        console.error("Error reading the docx file:", err);
    });
