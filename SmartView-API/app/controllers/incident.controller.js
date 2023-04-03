const Incidents = require("../models/incident.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create an incident
  const incident = new Incidents({
    incident_id: req.body.incident_id,
    incident_description: req.body.incident_description,
    incident_type: req.body.incident_type,
    cam_id: req.body.cam_id,
    incident_time: req.body.incident_time,
    incident_media: req.body.incident_assignee,
    assignee: req.body.assignee,
    priority_level: req.body.priority_level,
    incident_status: req.body.incident_status,
    officer_notes: req.body.officer_notes,
  });

  Incidents.create(incident, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error occured while creating the Incident",
      });
  });
};

// Retrieve all Incidents from the database.
exports.findAll = (req, res) => {
  Incidents.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error occured while retrieving Incidents",
      });
    else {
      res.json(data);
    }
  });
};

// Retrieve all Incidents from the database.
exports.findLow = (req, res) => {
  Incidents.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error occured while retrieving Incidents",
      });
    else {
      const filtered = data.filter(
        (incident) => incident.priority_level == "low"
      );
      res.json(filtered);
    }
  });
};

exports.findMedium = (req, res) => {
  Incidents.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error occured while retrieving Incidents",
      });
    else {
      const filtered = data.filter(
        (incident) => incident.priority_level == "medium"
      );
      res.json(filtered);
    }
  });
};

exports.findHigh = (req, res) => {
  Incidents.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error occured while retrieving Incidents",
      });
    else {
      const filtered = data.filter(
        (incident) => incident.priority_level == "high"
      );
      res.json(filtered);
    }
  });
};

// Retrieve all ongoing Incidents from the database.
exports.findOngoingCases = (req, res) => {
  Incidents.getOngoingCases((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error occured while retrieving ongoing Incidents",
      });
    else {
      res.json(data);
    }
  });
};

// Retrieve all completed Incidents from the database.
exports.findCompletedCases = (req, res) => {
  Incidents.getCompletedCases((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error occured while retrieving completed Incidents",
      });
    else {
      res.json(data);
    }
  });
};

// Retrieve incident based on Assignee
exports.getIncidentsBasedOnAssingee = (req, res) => {
  Incidents.getIncidentsBasedOnAssingee(req.params.assignee, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error occured while retrieving Incidents",
      });
    else {
      res.json(data);
    }
  });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  Incidents.findById(req.params.incident_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found incident id ${req.params.incident_id}`,
        });
      }
    } else res.json(data);
  });
};

// Get status of an incident
exports.findOneStatus = (req, res) => {
  Incidents.getCaseStatus(req.params.incident_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found incident id ${req.params.incident_id}`,
        });
      }
    } else res.json(data);
  });
};

// Update one incident status
exports.updateOneStatus = (req, res) => {
  Incidents.updateStatusById(
    req.params.incident_id,
    new Incidents(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found incident id ${req.params.incident_id}`,
          });
        }
      } else res.json(data);
    }
  );
};

// Update description of incident 
exports.updateOneDescription = (req, res) => {
  Incidents.updateById(
    req.params.incident_id,
    new Incidents(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found incident id ${req.params.incident_id}`,
          });
        }
      } else res.json(data);
    }
  );
};


