const fs = require('fs');

fs.writeFile('sample.txt', 'Hello! This file was created by Node.js.\n', function(err) {
    if (err) {
        console.log('Error creating file:', err);
        return;
    }
    console.log('File created successfully!');

    fs.readFile('sample.txt', 'utf8', function(err, data) {
        if (err) {
            console.log('Error reading file:', err);
            return;
        }
        console.log('File contents after creation:');
        console.log(data);

        fs.appendFile('sample.txt', 'This line was appended to the file.\n', function(err) {
            if (err) {
                console.log('Error appending to file:', err);
                return;
            }
            console.log('Data appended to file successfully!');

            fs.readFile('sample.txt', 'utf8', function(err, data) {
                if (err) {
                    console.log('Error reading file:', err);
                    return;
                }
                console.log('File contents after appending:');
                console.log(data);

                fs.unlink('sample.txt', function(err) {
                    if (err) {
                        console.log('Error deleting file:', err);
                        return;
                    }
                    console.log('File deleted successfully!');
                });
            });
        });
    });
});