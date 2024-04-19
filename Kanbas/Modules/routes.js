import * as moduleDao from './moduleDao.js';

function ModuleRoutes(app) {
  app.get("/api/courses/:cid/modules", async (req, res) => {
    try {
      const { cid } = req.params;
      const modules = await moduleDao.findModulesByCourseId(cid);
      res.json(modules);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/courses/:cid/modules", async (req, res) => {
    try {
      const { cid } = req.params;
      const newModule = await moduleDao.createModule({
        ...req.body,
        course: cid,
      });      
      res.json(newModule);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/modules/:mid", async (req, res) => {
    try {
      const { mid } = req.params;
      await moduleDao.deleteModuleById(mid);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.put("/api/modules/:mid", async (req, res) => {
    try {
      const { mid } = req.params;
      const updatedModule = await moduleDao.updateModuleById(mid, req.body);
      if (!updatedModule) {
        return res.sendStatus(404);
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
}

export default ModuleRoutes;
