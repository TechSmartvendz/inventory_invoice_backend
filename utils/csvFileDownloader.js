const sampleCsvFileDownload = (res, columnHeadings) => {
    // Define the heading for each row of the data
    const csv = `${[...columnHeadings]}\n`; 
    //const csv = 'Name,Profession\n'; we need this type format of headings
    // Set response headers to indicate CSV content
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="sample.csv"');
    // Send the CSV content as the response
    return csv;

};


module.exports = { sampleCsvFileDownload }