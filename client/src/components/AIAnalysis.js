import React, { useState } from "react";
import { Card, Form, Button, Spinner } from "react-bootstrap";
import { $authHost } from "../http/index";

const AIAnalysis = () => {
  const [question, setQuestion] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalysis = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await $authHost.post("/api/ai/analyze", { question });
      setAnalysis(data.analysis);
    } catch (error) {
      console.error("Error getting AI analysis:", error);
      setAnalysis("Error during analysis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mt-4 mb-4">
      <Card.Header as="h5">AI analysis</Card.Header>
      <Card.Body>
        <Form onSubmit={handleAnalysis}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Ask a question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Analyse"}
          </Button>
        </Form>

        {analysis && (
          <div className="mt-4">
            <h6>Analysis:</h6>
            <div className="p-3 bg-light">{analysis}</div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default AIAnalysis; 
