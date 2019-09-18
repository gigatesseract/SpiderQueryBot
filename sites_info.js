const info = {
  mess: {
    text: "Mess site",
    callback_data: "mess.nitt.edu",
    desc: "A website for registering to various messes for every month"
  },
  od: {
    text: "OD Portal",
    callback_data: "od.nitt.edu",
    desc: "A website for registering Ods"
  },
  scient: {
    text: "Scient website",
    callback_data: "scient.nitt.edu",
    desc: "A website for scient"
  },
  spider: {
    text: "Spider website",
    callback_data: "spider.nitt.edu",
    desc: "The spider main website"
  },
  sportsfete: {
    text: "Sportsfete",
    callback_data: "sportsfete.nitt.edu",
    desc: "Backend/Website for sportsfete"
  },
  hostel: {
    text: "Hostel site",
    callback_data: "hostel.nitt.edu",
    desc: "Hostel site for choosing hostels for second years."
  },
  general: {
    text: "General Queries",
    callback_data: "Club Spider (General)"
  }

};

const query = {
  complaint: {
    text: "Complaint"

  },
  feature: {
    text: "Feature"
  },
  feedback: {
    text: "Feedback"
  }
}
const messages = {
  start: "Please select a website maintained by spider",
  query: "What do you want to do?"
};

module.exports = {
  messages, info, query
}
