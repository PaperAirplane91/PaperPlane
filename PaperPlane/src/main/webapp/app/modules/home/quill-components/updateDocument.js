
export async function updateDocumentContent(documentId, content) {
  try {
    const response = await fetch(`http://localhost:8080/api/documents/${documentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
      }),
    });

    if (response.ok) {
      console.log('Document content updated successfully');
    } else {
      console.error('Error updating document content:', response.status);
    }
  } catch (error) {
    console.error('Error updating document content:', error);
  }
}
