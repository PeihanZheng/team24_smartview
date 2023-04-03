const sql = require("./db.js");

// constructor
const Incidents = function (incidents) {
  this.incident_id = incidents.incident_id;
  this.incident_description = incidents.incident_description;
  this.incident_type = incidents.incident_type;
  this.cam_id = incidents.cam_id;
  this.incident_time = incidents.incident_time;
  this.incident_media = incidents.incident_assignee;
  this.assignee = incidents.assignee;
  this.priority_level = incidents.priority_level;
  this.incident_status = incidents.incident_status;
  this.officer_notes = incidents.officer_notes;
};

Incidents.create = (newIncident, result) => {
  sql.query("INSERT INTO mydb.incidents SET ?", newIncident, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", {
      id: res.incident_id,
      ...newIncident,
    });
    result(null, { id: res.incident_id, ...newIncident });
  });
};

Incidents.findById = (incidentId, result) => {
  sql.query(
    `SELECT * FROM mydb.incidents WHERE incident_id = ${incidentId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found incident: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Customer with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Incidents.getAll = (result) => {
  sql.query("SELECT * FROM mydb.incidents", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("incidents: ", res);
    result(null, res);
  });
};

Incidents.getCaseStatus = (incidentId, result) => {
  sql.query(
    `SELECT incident_status FROM mydb.incidents WHERE incident_id = "${incidentId}"`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("incidents: ", res);
      result(null, res);
    }
  );
};

Incidents.getOngoingCases = (result) => {
  sql.query(
    "SELECT * FROM mydb.incidents WHERE incident_status= 'ongoing'",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("incidents: ", res);
      result(null, res);
    }
  );
};

Incidents.getCompletedCases = (result) => {
  sql.query(
    "SELECT * FROM mydb.incidents WHERE incident_status= 'completed'",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("incidents: ", res);
      result(null, res);
    }
  );
};

Incidents.getIncidentsBasedOnAssingee = (assignee, result) => {
  sql.query(
    `SELECT * FROM mydb.incidents WHERE assignee = "${assignee}"`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("incidents: ", res);
      result(null, res);
    }
  );
};

Incidents.updateById = (id, incident, result) => {
  sql.query(
    "UPDATE incidents SET officer_notes = ? WHERE incident_id = ?",
    [incident.officer_notes, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated incident: ", { id: id, ...incident });
      result(null, { id: id, ...incident });
    }
  );
};

Incidents.updateStatusById = (id, incident, result) => {
  sql.query(
    "UPDATE incidents SET incident_status = ? WHERE incident_id = ?",
    [incident.incident_status, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated incident: ", { id: id, ...incident });
      result(null, { id: id, ...incident });
    }
  );
};



//   static updateById(id, customer, result) {
//     query(
//       "UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",
//       [customer.email, customer.name, customer.active, id],
//       (err, res) => {
//         if (err) {
//           console.log("error: ", err);
//           result(null, err);
//           return;
//         }

//         if (res.affectedRows == 0) {
//           // not found Customer with the id
//           result({ kind: "not_found" }, null);
//           return;
//         }

//         console.log("updated incident: ", { id: id, ...customer });
//         result(null, { id: id, ...customer });
//       }
//     );
//   }
Incidents.remove = (incidentId, result) => {
  sql.query(
    "DELETE FROM mydb.incidents WHERE incident_id = ?",
    incidentId,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted incident with id: ", id);
      result(null, res);
    }
  );
};

Incidents.removeAll = (result) => {
  sql.query("DELETE FROM mydb.incidents", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} incidents`);
    result(null, res);
  });
};

module.exports = Incidents;
