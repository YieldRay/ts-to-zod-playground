import { generate } from 'ts-to-zod'

export function ts2zod(sourceText: string) {
    const {
        errors,
        transformedSourceText,
        getZodSchemasFile,
        getIntegrationTestFile,
        getInferredTypes,
        hasCircularDependencies,
    } = generate({
        sourceText,
    })

    if (errors.length) {
        throw new Error(errors.join(','))
    }

    return getZodSchemasFile('./source.ts')
}
