import db from "../Database/index.js";

function AssignmentRoutes(app) {
  app.get("/api/assignments/course/:cid", (req, res) => {
    const { cid } = req.params;
    const assignments = db.assignments.filter((a) => a.course === cid);
    res.json(assignments);
  });

  app.post("/api/assignments", (req, res) => {
    const newAssignment = { ...req.body, _id: `A${Date.now()}` };
    db.assignments.push(newAssignment);
    res.status(201).json(newAssignment);
  });

  app.put("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const index = db.assignments.findIndex((a) => a._id === aid);
    if (index === -1) return res.status(404).send('Assignment not found.');
    const updatedAssignment = { ...db.assignments[index], ...req.body };
    db.assignments[index] = updatedAssignment;
    res.status(200).json(updatedAssignment);
  });

  app.delete("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    db.assignments = db.assignments.filter((a) => a._id !== aid);
    res.status(204).send();
  });
  app.get("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const assignment = db.assignments.find((a) => a._id === aid);
    if (!assignment) {
      return res.status(404).send('Assignment not found');
    }
    res.json(assignment);
  });
}

export default AssignmentRoutes;
