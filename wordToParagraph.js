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
        if (line === '' || /^\d{1,2}:\d{2}$/.test(line) || /^\d{1,2}:\d{2}:\d{2}$/.test(line)) {
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

// Example usage:
//Fill up inside the queto with word format:
const subtitlesContent = `
0:02
OK, perfect.

0:03
Thank you.

0:05
And the team, all of us, all of you can hear us, right?

0:07
Gabe, can you hear us?

0:09
Wamsi, Eli, somebody giving your thumbs up?

0:13
Yep.

0:15
Fantastic.

0:16
Thank you.

0:17
Yeah.

0:17
So let me get started.

0:18
Right.

0:19
So the one question that I have is so, so there are like five groups, right.

0:25
When you when you went through that orbit screen, there are five groups in all, right.

0:31
So the first three groups basically we are gathering all the preliminary information, right.

`;

const paragraph = subtitlesToParagraph(subtitlesContent);
console.log(paragraph);
