export async function runLatencyTest(iterations: number = 10) {
    const results = [];
    for (let i = 0; i < iterations; i++) {
        const start = performance.now();
        await fetch("/api/benchmark");
        const end = performance.now();
        results.push(end - start);
    }
    return {
        avg: results.reduce((a, b) => a + b, 0) / results.length,
        min: Math.min(...results),
        max: Math.max(...results),
    };
}

export async function runHighTrafficTest(
    requests: number = 100,
    concurrency: number = 10
) {
    const start = performance.now();
    const batchSize = Math.min(requests, concurrency);
    const batches = Math.ceil(requests / batchSize);

    for (let i = 0; i < batches; i++) {
        const batchPromises = Array(batchSize)
            .fill(0)
            .map(() => fetch("/api/benchmark"));
        await Promise.all(batchPromises);
    }

    const end = performance.now();
    return {
        totalTime: end - start,
        requestsPerSecond: (requests / (end - start)) * 1000,
    };
}

export async function runThresholdTest(
    threshold: number = 200,
    iterations: number = 50
) {
    let successes = 0;
    for (let i = 0; i < iterations; i++) {
        const start = performance.now();
        await fetch("/api/benchmark");
        const end = performance.now();
        if (end - start <= threshold) {
            successes++;
        }
    }
    return {
        successRate: (successes / iterations) * 100,
        threshold,
        iterations,
    };
}
