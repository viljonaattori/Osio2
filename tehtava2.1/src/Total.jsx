const Total = ({ parts }) => {
  const Total = parts.reduce((sum, part) => sum + part.exercises, 0); // voisi tehdä myös loopilla esim. for
  return (
    <p>
      <strong> Total of {Total} exercises</strong>
    </p>
  );
};

export default Total;
