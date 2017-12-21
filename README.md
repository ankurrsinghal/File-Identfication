# File Information Application

## Method 1
Using a flat file database, which contains information for about 4000 file extensions
and their description.
We load the file in an object in the memory and when the request come for an extension, just map it on the object and respond with the result.

## Method 2
We scrap the data from the [FileInfo](https://fileinfo.com) and grab the file info
and respond with the result.