export function getEnvVar(variable, fallback = "") {
    return import.meta.env[variable] || fallback;
}