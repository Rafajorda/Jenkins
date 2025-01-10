!/bin/bash
if [ "$TEST_RESULT" == "SUCCESS" ]; then
    BADGE="https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg"
else
    BADGE="https://img.shields.io/badge/test-failure-red"
fi

echo -e "\nRESULTADO DE LOS ÚLTIMOS TESTS\n![Badge]($BADGE)" >> README.md