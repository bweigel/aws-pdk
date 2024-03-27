// ~~ Generated by projen. To modify, edit .projenrc.js and run "pnpm exec projen".
import { aws_codepipeline, aws_iam, aws_s3, pipelines } from 'aws-cdk-lib';

/**
 * CodePipelineProps
 */
export interface CodePipelineProps {
  /**
   * Deploy every stack by creating a change set and executing it.
   * When enabled, creates a "Prepare" and "Execute" action for each stack. Disable
   * to deploy the stack in one pipeline action.
   * @default true
   * @stability stable
   */
  readonly useChangeSets?: boolean;
  /**
   * Additional customizations to apply to the synthesize CodeBuild projects.
   * @default - Only `codeBuildDefaults` are applied
   * @stability stable
   */
  readonly synthCodeBuildDefaults?: pipelines.CodeBuildOptions;
  /**
   * Additional customizations to apply to the self mutation CodeBuild projects.
   * @default - Only `codeBuildDefaults` are applied
   * @stability stable
   */
  readonly selfMutationCodeBuildDefaults?: pipelines.CodeBuildOptions;
  /**
   * Whether the pipeline will update itself.
   * This needs to be set to `true` to allow the pipeline to reconfigure
   * itself when assets or stages are being added to it, and `true` is the
   * recommended setting.
   *
   * You can temporarily set this to `false` while you are iterating
   * on the pipeline itself and prefer to deploy changes using `cdk deploy`.
   * @default true
   * @stability stable
   */
  readonly selfMutation?: boolean;
  /**
   * The IAM role to be assumed by this Pipeline.
   * @default - A new role is created
   * @stability stable
   */
  readonly role?: aws_iam.IRole;
  /**
   * Reuse the same cross region support stack for all pipelines in the App.
   * @default - true (Use the same support stack for all pipelines in App)
   * @stability stable
   */
  readonly reuseCrossRegionSupportStacks?: boolean;
  /**
   * Publish assets in multiple CodeBuild projects.
   * If set to false, use one Project per type to publish all assets.
   *
   * Publishing in parallel improves concurrency and may reduce publishing
   * latency, but may also increase overall provisioning time of the CodeBuild
   * projects.
   *
   * Experiment and see what value works best for you.
   * @default true
   * @stability stable
   */
  readonly publishAssetsInParallel?: boolean;
  /**
   * The name of the CodePipeline pipeline.
   * @default - Automatically generated
   * @stability stable
   */
  readonly pipelineName?: string;
  /**
   * Enable KMS key rotation for the generated KMS keys.
   * By default KMS key rotation is disabled, but will add
   * additional costs when enabled.
   * @default - false (key rotation is disabled)
   * @stability stable
   */
  readonly enableKeyRotation?: boolean;
  /**
   * Enable Docker for the 'synth' step.
   * Set this to true if you are using file assets that require
   * "bundling" anywhere in your application (meaning an asset
   * compilation step will be run with the tools provided by
   * a Docker image), both for the Pipeline stack as well as the
   * application stacks.
   *
   * A common way to use bundling assets in your application is by
   * using the `aws-cdk-lib/aws-lambda-nodejs` library.
   *
   * Configures privileged mode for the synth CodeBuild action.
   *
   * If you are about to turn this on in an already-deployed Pipeline,
   * set the value to `true` first, commit and allow the pipeline to
   * self-update, and only then use the bundled asset.
   * @default false
   * @stability stable
   */
  readonly dockerEnabledForSynth?: boolean;
  /**
   * Enable Docker for the self-mutate step.
   * Set this to true if the pipeline itself uses Docker container assets
   * (for example, if you use `LinuxBuildImage.fromAsset()` as the build
   * image of a CodeBuild step in the pipeline).
   *
   * You do not need to set it if you build Docker image assets in the
   * application Stages and Stacks that are *deployed* by this pipeline.
   *
   * Configures privileged mode for the self-mutation CodeBuild action.
   *
   * If you are about to turn this on in an already-deployed Pipeline,
   * set the value to `true` first, commit and allow the pipeline to
   * self-update, and only then use the Docker asset in the pipeline.
   * @default false
   * @stability stable
   */
  readonly dockerEnabledForSelfMutation?: boolean;
  /**
   * A list of credentials used to authenticate to Docker registries.
   * Specify any credentials necessary within the pipeline to build, synth, update, or publish assets.
   * @default []
   * @stability stable
   */
  readonly dockerCredentials?: Array<pipelines.DockerCredential>;
  /**
   * A map of region to S3 bucket name used for cross-region CodePipeline.
   * For every Action that you specify targeting a different region than the Pipeline itself,
   * if you don't provide an explicit Bucket for that region using this property,
   * the construct will automatically create a Stack containing an S3 Bucket in that region.
   * Passed directly through to the {@link cp.Pipeline}.
   * @default - no cross region replication buckets.
   * @stability stable
   */
  readonly crossRegionReplicationBuckets?: Record<string, aws_s3.IBucket>;
  /**
   * Create KMS keys for the artifact buckets, allowing cross-account deployments.
   * The artifact buckets have to be encrypted to support deploying CDK apps to
   * another account, so if you want to do that or want to have your artifact
   * buckets encrypted, be sure to set this value to `true`.
   *
   * Be aware there is a cost associated with maintaining the KMS keys.
   * @default false
   * @stability stable
   */
  readonly crossAccountKeys?: boolean;
  /**
   * An existing Pipeline to be reused and built upon.
   * [disable-awslint:ref-via-interface]
   * @default - a new underlying pipeline is created.
   * @stability stable
   */
  readonly codePipeline?: aws_codepipeline.Pipeline;
  /**
   * Customize the CodeBuild projects created for this pipeline.
   * @default - All projects run non-privileged build, SMALL instance, LinuxBuildImage.STANDARD_7_0
   * @stability stable
   */
  readonly codeBuildDefaults?: pipelines.CodeBuildOptions;
  /**
   * CDK CLI version to use in self-mutation and asset publishing steps.
   * If you want to lock the CDK CLI version used in the pipeline, by steps
   * that are automatically generated for you, specify the version here.
   *
   * We recommend you do not specify this value, as not specifying it always
   * uses the latest CLI version which is backwards compatible with old versions.
   *
   * If you do specify it, be aware that this version should always be equal to or higher than the
   * version of the CDK framework used by the CDK app, when the CDK commands are
   * run during your pipeline execution. When you change this version, the *next
   * time* the `SelfMutate` step runs it will still be using the CLI of the the
   * *previous* version that was in this property: it will only start using the
   * new version after `SelfMutate` completes successfully. That means that if
   * you want to update both framework and CLI version, you should update the
   * CLI version first, commit, push and deploy, and only then update the
   * framework version.
   * @default - Latest version
   * @stability stable
   */
  readonly cliVersion?: string;
  /**
   * Additional customizations to apply to the asset publishing CodeBuild projects.
   * @default - Only `codeBuildDefaults` are applied
   * @stability stable
   */
  readonly assetPublishingCodeBuildDefaults?: pipelines.CodeBuildOptions;
  /**
   * An existing S3 Bucket to use for storing the pipeline's artifact.
   * @default - A new S3 bucket will be created.
   * @stability stable
   */
  readonly artifactBucket?: aws_s3.IBucket;
  /**
   * The build step that produces the CDK Cloud Assembly.
   * The primary output of this step needs to be the `cdk.out` directory
   * generated by the `cdk synth` command.
   *
   * If you use a `ShellStep` here and you don't configure an output directory,
   * the output directory will automatically be assumed to be `cdk.out`.
   * @stability stable
   */
  readonly synth?: pipelines.IFileSetProducer;
}
