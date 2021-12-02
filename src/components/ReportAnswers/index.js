import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { Check, Clear } from "@material-ui/icons";

export const ReportAnswers = ({ answers }) => {
  const navigate = useNavigate();

  const [totalHits, setTotalHits] = useState(0);
  const [totalErros, setTotalErros] = useState(0);

  useEffect(() => {
    const hits = answers.reduce((acc, question) => {
      return (acc += Number(question.answer === question.correct_answer));
    }, 0);

    setTotalHits(hits);
    setTotalErros(answers.length - hits);
  }, [answers]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography sx={{ mt: 2 }} textAlign="center">
        All questions completed - you&apos;re finished
      </Typography>

      {answers.map((answer, index) => (
        <Box
          key={answer.question}
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            <Typography fontWeight="bold">{++index} -</Typography>

            <Typography
              color="#444444"
              dangerouslySetInnerHTML={{ __html: answer.question }}
            ></Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "0.5rem",
            }}
          >
            <Check fontSize="small" color="success" />
            <Typography color="green" fontSize="0.9rem">
              {answer.correct_answer}
            </Typography>
          </Box>

          {answer.answer !== answer.correct_answer && (
            <Box
              sx={{
                display: "flex",
                gap: "0.5rem",
              }}
            >
              <Clear fontSize="small" color="secondary" />
              <Typography color="secondary" fontSize="0.9rem">
                {answer.answer}
              </Typography>
            </Box>
          )}
        </Box>
      ))}

      <Typography sx={{ mt: 2, mb: 3 }} textAlign="center">
        You got {totalHits} {totalHits > 1 ? "questions" : "question"} right and{" "}
        {totalErros} {totalErros > 1 ? "questions" : "question"} wrong.
      </Typography>

      <Button
        variant="outlined"
        color="warning"
        onClick={() => navigate(`/`)}
        sx={{ maxWidth: "150px", margin: "0 auto" }}
      >
        New Game
      </Button>
    </Box>
  );
};

ReportAnswers.propTypes = {
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
      correct_answer: PropTypes.string.isRequired,
    })
  ).isRequired,
};