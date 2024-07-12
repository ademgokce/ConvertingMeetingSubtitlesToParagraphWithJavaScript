/**
 * Converts SRT formatted subtitles into a paragraph by concatenating text after each dot (period) or question mark.
 * @param {string} srt - The SRT formatted subtitles as a string.
 * @returns {string} - The resulting paragraph.
 */
function srtToParagraph(srt) {
    // Split the SRT content into lines
    const lines = srt.split('\n');
    let paragraph = '';
    let currentSentence = '';

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip empty lines and lines with timestamps
        if (line === '' || /^[a-z0-9\-]+$/i.test(line) || line.includes('-->')) {
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
//Fill up inside the queto with srt format:
const srtContent = `
088cbce3-f1c4-420b-a436-84f6dc74c6f6-0
00:00:02.960 --> 00:00:03.440
OK, perfect.

733a80a6-1f83-4f63-9413-733b818d144b-0
01:02:07.160 --> 01:02:09.080
Will we take it from the other
room or?

48e2b4f3-629a-4bbc-bd28-34e85f909f76-0
01:02:09.160 --> 01:02:09.600
Yeah, we.

8ce6dbc1-c602-45c5-a59c-42c83320a00e-0
01:02:09.600 --> 01:02:12.221
We have to vacate this room Oh
no, we can take it from here

8ce6dbc1-c602-45c5-a59c-42c83320a00e-1
01:02:12.221 --> 01:02:12.440
Yeah.

e1b32b22-08cb-45cb-a0f0-496b7712f953-0
01:02:12.440 --> 01:02:15.040
Everybody's busy with the other
meetings, so let's go.

b4363db3-dfdc-4104-ad5d-7269fce47c4a-0
01:02:16.320 --> 01:02:17.280
We'll drop off from here.

6a3bbc8b-5b9f-4255-91f6-0d7adf02184a-0
01:02:18.600 --> 01:02:21.400
So you have to hang up there and
therefore.
`;

const paragraph = srtToParagraph(srtContent);
console.log(paragraph);
