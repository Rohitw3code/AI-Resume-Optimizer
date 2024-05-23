import aspose.pdf as ap

# Create TeXLoadOptions class object
options = ap.TeXLoadOptions()

# Create a Document class object
document = ap.Document("new_resume.tex" , options)

# Convert Latex to PDF
document.save("tex-to-pdf.pdf")