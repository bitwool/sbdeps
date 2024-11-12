// 获取版本列表并显示
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // 过滤掉 hasDoc 为 false 的项
        data = data.filter(item => item.hasDoc);
        console.log(data);

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
                showDeps(item.sbVersion);
            });

            sbVersionCell.appendChild(link);
            springVersionCell.textContent = item.springVersion || "N/A";

            row.appendChild(sbVersionCell);
            row.appendChild(springVersionCell);

            versionTableBody.appendChild(row);
        });

        function showDeps(sbVersion) {
            // 从 ./data/version.json 获取依赖列表
            fetch('./data/' + sbVersion+ '.json')
                .then(response => response.json())
                .then(deps => {
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
                })
                .catch(error => console.error("获取依赖列表出错：", error));
        }

        backLink.addEventListener("click", (e) => {
            e.preventDefault();
            depsSection.style.display = "none";
            document.getElementById("versionTable").style.display = "table";
        });
    })
    .catch(error => console.error("获取版本列表出错：", error));