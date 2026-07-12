from fastapi import APIRouter
import subprocess
import tempfile
import os
import sys

router = APIRouter(
    prefix="/code",
    tags=["Code Runner"]
)


@router.post("/run")
def run_code(data: dict):

    code = data.get("code", "")
    test_input = data.get("input", "")

    if not code.strip():
        return {
            "stdout": "",
            "stderr": "No code provided."
        }

    with tempfile.NamedTemporaryFile(
        suffix=".py",
        delete=False,
        mode="w",
        encoding="utf-8"
    ) as f:

        f.write(code)
        filename = f.name

    try:

        print("\n========== CODE RECEIVED ==========")
        print(code)
        print("===================================\n")

        result = subprocess.run(
            [sys.executable, filename],   # Use current Python interpreter
            input=test_input,
            capture_output=True,
            text=True,
            timeout=5
        )

        print("========== STDOUT ==========")
        print(result.stdout)
        print("============================")

        print("========== STDERR ==========")
        print(result.stderr)
        print("============================")

        return {
            "stdout": result.stdout,
            "stderr": result.stderr,
            "returncode": result.returncode
        }

    except subprocess.TimeoutExpired:

        return {
            "stdout": "",
            "stderr": "Time Limit Exceeded",
            "returncode": -1
        }

    except Exception as e:

        return {
            "stdout": "",
            "stderr": str(e),
            "returncode": -1
        }

    finally:

        if os.path.exists(filename):
            os.remove(filename)
@router.post("/test")
def test_code(data: dict):

    code = data.get("code", "")
    test_input = data.get("input", "")
    expected_output = data.get("expected_output", "").strip()

    with tempfile.NamedTemporaryFile(
        suffix=".py",
        delete=False,
        mode="w",
        encoding="utf-8"
    ) as f:
        f.write(code)
        filename = f.name

    try:
        result = subprocess.run(
            [sys.executable, filename],
            input=test_input,
            capture_output=True,
            text=True,
            timeout=5
        )

        actual_output = result.stdout.strip()

        return {
            "passed": actual_output == expected_output,
            "expected": expected_output,
            "actual": actual_output
        }

    finally:
        if os.path.exists(filename):
            os.remove(filename)
