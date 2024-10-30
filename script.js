fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
        const versionTableBody = document.querySelector("#versionTable tbody");
        const depsSection = document.getElementById("depsSection");
        const depsTableBody = document.querySelector("#depsTable tbody");
        const backLink = document.getElementById("backLink");

        // 填充版本列表表格
        data.forEach((item) => {
            const row = document.createElement("tr");
            const sbVersionCell = document.createElement("td");
            const springVersionCell = document.createElement("td");

            const link = document.createElement("a");
            link.href = "#";
            link.textContent = item.sbVersion;
            link.addEventListener("click", () => {
                showDeps(item.deps, item.sbVersion);
            });

            sbVersionCell.appendChild(link);
            springVersionCell.textContent = item.springVersion;

            row.appendChild(sbVersionCell);
            row.appendChild(springVersionCell);

            versionTableBody.appendChild(row);
        });

        function showDeps(deps, sbVersion) {
            // 隐藏版本列表，显示依赖列表
            document.getElementById("versionTable").style.display = "none";
            depsSection.style.display = "block";
            document.querySelector(".deps-title").textContent =
                "依赖列表 - sbVersion: " + sbVersion;

            // 清空之前的依赖列表
            depsTableBody.innerHTML = "";

            // 填充依赖列表表格
            deps.forEach((dep) => {
                const row = document.createElement("tr");
                const groupIdCell = document.createElement("td");
                const artifactIdCell = document.createElement("td");
                const versionCell = document.createElement("td");

                groupIdCell.textContent = dep.groupId;
                artifactIdCell.textContent = dep.artifactId;
                versionCell.textContent = dep.version;

                row.appendChild(groupIdCell);
                row.appendChild(artifactIdCell);
                row.appendChild(versionCell);

                depsTableBody.appendChild(row);
            });
        }

        backLink.addEventListener("click", (e) => {
            e.preventDefault();
            depsSection.style.display = "none";
            document.getElementById("versionTable").style.display = "table";
        });
    })
    .catch((error) => console.error("Error fetching data:", error));