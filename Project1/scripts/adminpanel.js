// =========================
// TAB SWITCHING
// =========================

function switchTab(event, tabId) {

    const contents = document.querySelectorAll(".tab-content");

    contents.forEach(content => {
        content.classList.remove("active");
    });

    const buttons = document.querySelectorAll(".tab-btn");

    buttons.forEach(button => {
        button.classList.remove("active");
    });

    document.getElementById(tabId).classList.add("active");

    event.currentTarget.classList.add("active");
}


// =========================
// SUPABASE
// =========================

const supabaseUrl = "https://etqoygahwfwclfgqoxqk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0cW95Z2Fod2Z3Y2xmZ3FveHFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzODU4MzksImV4cCI6MjA4Njk2MTgzOX0.UV3l-ynuuaaDd9anLfa197o0kaQiT1PggyjsS-xn9sQ";

const supa = supabase.createClient(
    supabaseUrl,
    supabaseKey
);


// =========================
// CURRENT EDITING ENTRY
// =========================

let editingId = null;


// =========================
// GET CATEGORY
// =========================

function getCategory(activeTab) {

    if (activeTab.id === "tab1") {
        return "spacex";
    }

    if (activeTab.id === "tab2") {
        return "soccer";
    }

    if (activeTab.id === "tab3") {
        return "baseball";
    }

    if (activeTab.id === "tab4") {
        return "mcsr";
    }

    if (activeTab.id === "tab5") {
        return "other";
    }

    return "";
}


// =========================
// GET FORM DATA
// =========================

function getEntryFromForm() {

    const activeTab =
        document.querySelector(".tab-content.active");

    return {

        category: getCategory(activeTab),

        date:
            activeTab.querySelector("#date").value,

        opponent:
            activeTab.querySelector("#opponent")?.value || null,

        score:
            activeTab.querySelector("#score")?.value || null,

        time:
            activeTab.querySelector("#time")?.value || null,

        overworld:
            activeTab.querySelector("#overworld")?.value || null,

        bastion:
            activeTab.querySelector("#bastion")?.value || null,

        end_enter:
            activeTab.querySelector("#end_enter")?.value || null,

        mission:
            activeTab.querySelector("#mission")?.value || null,

        status:
            activeTab.querySelector("#status")?.value || null,

        team:
            activeTab.querySelector("#team")?.value || null,

        notes:
            activeTab.querySelector("#notes")?.value || null
    };
}


// =========================
// FORM SUBMISSION
// =========================

document.getElementById("form").addEventListener(
    "submit",
    async function(e) {

        e.preventDefault();

        const entry = getEntryFromForm();

        if (!entry.date) {

            alert("Please enter a date.");

            return;
        }


        // =====================
        // EDIT EXISTING ENTRY
        // =====================

        if (editingId) {

            const { error } = await supa
                .from("entries")
                .update(entry)
                .eq("id", editingId)


            if (error) {

                console.error(error);

                alert(
                    "Error updating entry: "
                    + error.message
                );

                return;
            }


            alert("Entry updated!");

            editingId = null;

            resetForm();

            document.querySelector(
                "#form button[type='submit']"
            ).textContent = "Save Entry";


            loadEntries();

            return;
        }


        // =====================
        // CREATE NEW ENTRY
        // =====================

        const { error } = await supa
            .from("entries")
            .insert([entry]);


        if (error) {

            console.error(error);

            alert(
                "Supabase Error: "
                + error.message
            );

            return;
        }


        alert("Saved!");

        resetForm();

    }
);


// =========================
// RESET FORM
// =========================

function resetForm() {

    const activeTab =
        document.querySelector(".tab-content.active");

    activeTab
        .querySelectorAll("input, textarea")
        .forEach(input => {
            input.value = "";
        });

    editingId = null;

    document
        .querySelectorAll(
            "#form button[type='submit']"
        )
        .forEach(button => {
            button.textContent = "Save Entry";
        });
}


// =========================
// MANAGE BUTTON
// =========================

document
    .getElementById("manageBtn")
    .addEventListener("click", function() {

        const panel =
            document.getElementById("managePanel");

        panel.classList.toggle("show");

        if (panel.classList.contains("show")) {

            loadEntries();

        }

    });


// =========================
// CLOSE MANAGE PANEL
// =========================

document
    .getElementById("closeManage")
    .addEventListener("click", function() {

        document
            .getElementById("managePanel")
            .classList.remove("show");

    });


// =========================
// LOAD ENTRIES
// =========================

async function loadEntries() {

    const list =
        document.getElementById("entriesList");

    list.innerHTML = "Loading entries...";


    const { data, error } = await supa
        .from("entries")
        .select("*")
        .order("date", { ascending: false });


    if (error) {

        console.error(error);

        list.innerHTML =
            "Error loading entries.";

        return;
    }


    if (!data || data.length === 0) {

        list.innerHTML =
            "<p>No entries yet.</p>";

        return;
    }


    list.innerHTML = "";


    data.forEach(entry => {

        const row =
            document.createElement("div");

        row.className = "entry-row";


        const information =
            document.createElement("div");

        information.className =
            "entry-information";


        const category =
            document.createElement("span");

        category.className =
            "entry-category";

        category.textContent =
            entry.category;


        const title =
            document.createElement("strong");


        // Pick something useful to display
        title.textContent =
            entry.mission ||
            entry.opponent ||
            entry.team ||
            entry.time ||
            "Untitled Entry";


        const date =
            document.createElement("small");

        date.textContent =
            entry.date || "";


        information.appendChild(category);
        information.appendChild(title);
        information.appendChild(date);


        // =====================
        // EDIT BUTTON
        // =====================

        const editButton =
            document.createElement("button");

        editButton.textContent = "Edit";

        editButton.className =
            "edit-button";


        editButton.addEventListener(
            "click",
            function() {

                editEntry(entry);

            }
        );


        // =====================
        // DELETE BUTTON
        // =====================

        const deleteButton =
            document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className =
            "delete-button";


        deleteButton.addEventListener(
            "click",
            function() {

                deleteEntry(entry.id);

            }
        );


        const actions =
            document.createElement("div");

        actions.className =
            "entry-actions";


        actions.appendChild(editButton);
        actions.appendChild(deleteButton);


        row.appendChild(information);
        row.appendChild(actions);


        list.appendChild(row);

    });

}


// =========================
// EDIT ENTRY
// =========================

function editEntry(entry) {

    editingId = entry.id;


    let tabId = "tab5";


    if (entry.category === "spacex") {
        tabId = "tab1";
    }

    if (entry.category === "soccer") {
        tabId = "tab2";
    }

    if (entry.category === "baseball") {
        tabId = "tab3";
    }

    if (entry.category === "mcsr") {
        tabId = "tab4";
    }


    // Activate correct tab

    const button =
        document.querySelector(
            `.tab-btn[onclick*="${tabId}"]`
        );

    if (button) {

        switchTab(
            { currentTarget: button },
            tabId
        );

    }


    const tab =
        document.getElementById(tabId);


    // Fill fields

    const fields = [
        "date",
        "opponent",
        "score",
        "time",
        "overworld",
        "bastion",
        "end_enter",
        "mission",
        "status",
        "team",
        "notes"
    ];


    fields.forEach(field => {

        const input =
            tab.querySelector("#" + field);

        if (input) {

            input.value =
                entry[field] || "";

        }

    });


    // Change button text

    document
        .querySelectorAll(
            "#form button[type='submit']"
        )
        .forEach(button => {

            button.textContent =
                "Update Entry";

        });


    // Hide manage panel

    document
        .getElementById("managePanel")
        .classList.remove("show");


    // Scroll back to form

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// =========================
// DELETE ENTRY
// =========================

async function deleteEntry(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this entry?"
        );


    if (!confirmed) {
        return;
    }


    const { error } = await supa
        .from("entries")
        .delete()
        .eq("id", id);


    if (error) {

        console.error(error);

        alert(
            "Error deleting entry: "
            + error.message
        );

        return;
    }


    alert("Entry deleted.");

    loadEntries();

}