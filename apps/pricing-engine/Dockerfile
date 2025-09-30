FROM python:3.11-slim
WORKDIR /app
COPY pyproject.toml /app/
RUN pip install --no-cache-dir uv pipx && pipx run pip-tools --version || true
RUN pip install --no-cache-dir fastapi==0.115.5 uvicorn[standard]==0.32.0
COPY app /app/app
EXPOSE 8000
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]







