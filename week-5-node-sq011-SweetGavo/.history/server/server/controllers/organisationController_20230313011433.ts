const Organisation = require("../models/organisationModel");

const getpost = require("../utils");

async function getOrganisations(req: any, res: any) {
  try {
    const organisation = await Organisation.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(organisation));
  } catch (error) {
    console.log(error);
  }
}

async function getOrganisation(req: any, res: any, id: any) {
  try {
    const organisation = await Organisation.findById(id);

    if (!organisation) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Organisation Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(organisation));
    }
  } catch (error) {
    console.log(error);
  }
}

async function createOrganisation(req: any, res: any) {
  try {
    const body = await getpost.getPostData(req.body);

    const { name, description, price } = JSON.parse(body);

    const organisation = {
      name: name,
      description: description,
      price: price,
    };

    const newOrganisation = await Organisation.create(organisation);

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newOrganisation));
  } catch (error) {
    console.log(error);
  }
}

async function updateOrganisation(req: any, res: any, id: any) {
  try {
    const organisation = await Organisation.findById(id);

    if (!organisation) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Organisation Not Found" }));
    } else {
      const body = await getpost.getPostData(req);

      const {
        organization,
        createdAt,
        updatedAt,
        products,
        marketValue,
        address,
        ceo,
        country,
        noOfEmployees,
        employees,
      } = JSON.parse(body);

      const organisationData = {
        organization: organization || organisation.organization,
        createdAt: createdAt || organisation.createdAt,
        updatedAt: updatedAt || organisation.updatedAt,
        products: products || organisation.products,
        marketValue: marketValue || organisation.marketValue,
        address: address || organisation.address,
        ceo: ceo || organisation.ceo,
        country: country || organisation.country,
        noOfEmployees: noOfEmployees || organisation.noOfEmployees,
        employees: employees || organisation.employees,
      };

      const updOrganisation = await Organisation.update(id, organisationData);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updOrganisation));
    }
  } catch (error) {
    console.log(error);
  }
}

async function deleteOrganisation(req: any, res: any, id: any) {
  try {
    const organisation = await Organisation.findById(id);

    if (!organisation) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Database Not Found" }));
    } else {
      await Organisation.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Database ${id} removed` }));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getOrganisations,
  getOrganisation,
  createOrganisation,
  updateOrganisation,
  deleteOrganisation,
};
